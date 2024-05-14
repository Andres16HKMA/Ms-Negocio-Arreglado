import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conductor from 'App/Models/Conductor';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env'
import { ModelObject } from '@ioc:Adonis/Lucid/Orm';
import ConductorValidator from 'App/Validators/ConductorValidator';

export default class ConductorController {
    public async find({ request, params }: HttpContextContract) {
        let theRequest = request.toJSON()
        const conductors: ModelObject[] = [];
        const { page, per_page } = request.only(["page", "per_page"]);
        let thePermission: object = {
            url: theRequest.url,
            method: theRequest.method
          }
        if (params.id) {
          const theConductor: Conductor = await Conductor.findOrFail(params.id);
    
          conductors.push(theConductor);
        } else if (page && per_page) {
          const { meta, data } = await Conductor.query()
            .paginate(page, per_page)
            .then((res) => res.toJSON())
            
          await Promise.all(
            data.map(async (conductor: Conductor) => {
              const res = await axios.get(`${Env.get("MS_SECURITY")}/api/public/users/${conductor.user_id}`, thePermission)
              const { _id, name, email } = res.data;
              const { id, document, carModel } = conductor;
              conductors.push({
                id,
                user_id: _id,
                name,
                email,
                document,
                carModel
              });
            }),
          );
    
          return { meta, data: conductors };
        } else {
          const allConductor = await Conductor.all();
          conductors.push(...allConductor.map((c) => c.toJSON()));
        }
        
    
        await Promise.all(conductors.map(async (conductores: Conductor, index: number) => {
            const res = await axios.get(`${Env.get("MS_SECURITY")}/api/public/users/${conductores.user_id}`, thePermission 
            );
            const { _id, name, email } = res.data;
            const { id, document, carModel } = conductores;
            conductors[index] = {
              id,
              user_id: _id,
              name,
              email,
              document,
              carModel
            };
          }),
        );
    
        return conductors;
      }
    public async store({request}:HttpContextContract){
        const body = await request.validate(ConductorValidator)
        const theConductor=await Conductor.create(body)
        return theConductor;
    }
    public async index({request}: HttpContextContract){
        const page =request.input('page', 1);
        const perPage = request.input("per_page", 20)
        let conductor:Conductor[]=await Conductor.query().paginate(page, perPage)
        return conductor;  
    }
    public async show({params}:HttpContextContract){
        return Conductor.findOrFail(params.id)
    }
    public async update({params, request}: HttpContextContract){
        const body = request.body();
        const theConductor: Conductor = await Conductor.findOrFail(params.id);
        theConductor.carModel = body.carModel;
        theConductor.document = body.document;

        return theConductor.save();
    }
    public async destroy({params, response}: HttpContextContract){
        const theConductor: Conductor = await Conductor.findOrFail(params.id);
        response.status(204);
        return theConductor.delete()
    }
}

