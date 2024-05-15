import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ModelObject } from '@ioc:Adonis/Lucid/Orm';
import Desplazamiento from 'App/Models/Desplazamiento';
import DesplazamientoValidator from 'App/Validators/DesplazamientoValidator';
import axios from 'axios';


export default class DesplazamientosController {
    public async store({request}:HttpContextContract){
        const body = await request.validate(DesplazamientoValidator)
        const theDesplazamiento=await Desplazamiento.create(body)
        
        return theDesplazamiento;
    }
    public async find({ request, params }: HttpContextContract) {
        let theRequest = request.toJSON()
        const customers: ModelObject[] = [];
        const { page, per_page } = request.only(["page", "per_page"]);
        let thePermission: object = {
            url: theRequest.url,
            method: theRequest.method
          }
        if (params.id) {
            let theCustomer = await Desplazamiento.findOrFail(params.id);
            await theCustomer.load("conductor")
          customers.push(theCustomer);
        } else if (page && per_page) {
          const { meta, data } = await Desplazamiento.query()
            .paginate(page, per_page)
            .then((res) => res.toJSON())
            
          await Promise.all(
            data.map(async (customer: Desplazamiento) => {
                const res = await axios.get(`https://api-colombia.com//api/v1/Airport/${customer.id_aeropuerto}`, thePermission 
            );
                const { _id, name} = res.data;
              const { id, fecha, id_fertro, id_conductor } = customer;
              customers.push({
                id,
                id_aeropuerto: _id,
                name,
                fecha,
                id_fertro,
                id_conductor
              });
            }),
          );
    
          return { meta, data: customers };
        } else {
          const allClients = await Desplazamiento.all();
          customers.push(...allClients.map((c) => c.toJSON()));
        }
        
    
        await Promise.all(customers.map(async (clients: Desplazamiento, index: number) => {
            const res = await axios.get(`https://api-colombia.com/api/v1/Airport/${clients.id_aeropuerto}`, thePermission 
            );
            const { _id, name } = res.data;
            const { id, fecha,id_conductor, id_fertro  } = clients;
            customers[index] = {
              id,
              id_aeropuerto: _id,
              name,
              id_fertro,
              id_conductor,
              fecha
            };
          }),
        );
    
        return customers;
      }
    
    public async show({ request, params }: HttpContextContract) {
        if (params.id) {
            let theDesplazamiento = await Desplazamiento.findOrFail(params.id);
            await theDesplazamiento.load("conductor")
            await theDesplazamiento.load("fertro")

            return theDesplazamiento;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Desplazamiento.query().paginate(page, perPage)
            } else {
                return await Desplazamiento.query()
            }

        }

    }

      
}
