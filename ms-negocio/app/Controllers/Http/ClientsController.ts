import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Clients from 'App/Models/Client';
import ClientValidator from 'App/Validators/ClientValidator';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env'
import { ModelObject } from '@ioc:Adonis/Lucid/Orm';

export default class ClientssController {
    public async find({ request, params }: HttpContextContract) {
        let theRequest = request.toJSON()
        const customers: ModelObject[] = [];
        const { page, per_page } = request.only(["page", "per_page"]);
        let thePermission: object = {
            url: theRequest.url,
            method: theRequest.method
          }
        if (params.id) {
          const theCustomer: Clients = await Clients.findOrFail(params.id);
    
          customers.push(theCustomer);
        } else if (page && per_page) {
          const { meta, data } = await Clients.query()
            .paginate(page, per_page)
            .then((res) => res.toJSON())
            
          await Promise.all(
            data.map(async (customer: Clients) => {
              const res = await axios.get(`${Env.get("MS_SECURITY")}/api/public/users/${customer.user_id}`, thePermission)
              const { _id, name, email } = res.data;
              const { id, document, celphone } = customer;
              customers.push({
                id,
                user_id: _id,
                name,
                email,
                document,
                celphone,
              });
            }),
          );
    
          return { meta, data: customers };
        } else {
          const allClients = await Clients.all();
          customers.push(...allClients.map((c) => c.toJSON()));
        }
        
    
        await Promise.all(customers.map(async (clients: Clients, index: number) => {
            const res = await axios.get(`${Env.get("MS_SECURITY")}/api/public/users/${clients.user_id}`, thePermission 
            );
            const { _id, name, email } = res.data;
            const { id, document, celphone } = clients;
            customers[index] = {
              id,
              user_id: _id,
              name,
              email,
              document,
              celphone
            };
          }),
        );
    
        return customers;
      }
    public async store({request}:HttpContextContract){
        const body = await request.validate(ClientValidator)
        const theClients=await Clients.create(body)
        return theClients;
    }
    public async index({request}: HttpContextContract){
        const page =request.input('page', 1);
        const perPage = request.input("per_page", 20)
        let client:Clients[]=await Clients.query().paginate(page, perPage)
        return client;  
    }
    public async show({params}:HttpContextContract){
        return Clients.findOrFail(params.id)
    }
    public async update({params, request}: HttpContextContract){
        const body = request.body();
        const theClients: Clients = await Clients.findOrFail(params.id);
        theClients.celphone = body.celphone;
        theClients.document = body.document;

        return theClients.save();
    }
    public async destroy({params, response}: HttpContextContract){
        const theClients: Clients = await Clients.findOrFail(params.id);
        response.status(204);
        return theClients.delete()
    }
}
