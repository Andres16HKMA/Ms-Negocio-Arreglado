import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env'
import { ModelObject } from '@ioc:Adonis/Lucid/Orm';
import Administrador from 'App/Models/Administrador';
import AdministratorValidator from 'App/Validators/AdministratorValidator';

export default class AdministratorController {
    public async find({ request, params }: HttpContextContract) {
        let theRequest = request.toJSON()
        const administrador: ModelObject[] = [];
        const { page, per_page } = request.only(["page", "per_page"]);
        let thePermission: object = {
            url: theRequest.url,
            method: theRequest.method
          }
        if (params.id) {
          const theAdministrador: Administrador = await Administrador.findOrFail(params.id);
    
          administrador.push(theAdministrador);
        } else if (page && per_page) {
          const { meta, data } = await Administrador.query()
            .paginate(page, per_page)
            .then((res) => res.toJSON())
            
          await Promise.all(
            data.map(async (admin: Administrador) => {
              const res = await axios.get(`${Env.get("MS_SECURITY")}/api/public/users/${admin.user_id}`, thePermission)
              const { _id, name, email } = res.data;
              const { id, document } = admin;
              administrador.push({
                id,
                user_id: _id,
                name,
                email,
                document,
              });
            }),
          );
    
          return { meta, data: administrador };
        } else {
          const allAdministrador = await Administrador.all();
          administrador.push(...allAdministrador.map((c) => c.toJSON()));
        }
        
    
        await Promise.all(administrador.map(async (admin: Administrador, index: number) => {
            const res = await axios.get(`${Env.get("MS_SECURITY")}/api/public/users/${admin.user_id}`, thePermission 
            );
            const { _id, name, email } = res.data;
            const { id, document } = admin;
            admin[index] = {
              id,
              user_id: _id,
              name,
              email,
              document,
            };
          }),
        );
    
        return administrador;
      }
    public async store({request}:HttpContextContract){
        const body = await request.validate(AdministratorValidator)
        const theAdministrador=await Administrador.create(body)
        return theAdministrador;
    }
    public async index({request}: HttpContextContract){
        const page =request.input('page', 1);
        const perPage = request.input("per_page", 20)
        let admin:Administrador[]=await Administrador.query().paginate(page, perPage)
        return admin;  
    }
    public async show({params}:HttpContextContract){
        return Administrador.findOrFail(params.id)
    }
    public async update({params, request}: HttpContextContract){
        const body = request.body();
        const theAdministrador: Administrador = await Administrador.findOrFail(params.id);
        theAdministrador.document = body.document;

        return theAdministrador.save();
    }
    public async destroy({params, response}: HttpContextContract){
        const theAdministrador: Administrador = await Administrador.findOrFail(params.id);
        response.status(204);
        return theAdministrador.delete()
    }
}
