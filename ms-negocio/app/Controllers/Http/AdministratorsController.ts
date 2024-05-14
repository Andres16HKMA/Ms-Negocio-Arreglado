import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Administrador from 'App/Models/Administrador';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env'

export default class administradorsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let TheClient = await Administrador.findOrFail(params.id);
            return TheClient;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                let auxClient: {}[] = [];

                let originalAdministrador: Administrador[] = await Administrador.query().paginate(page, perPage);
                for (let i = 0; i < originalAdministrador.length; i++) {
                    let api_response = await axios.get(`${Env.get('MS_SECURITY')}/api/public/user/`+originalAdministrador[i].user_id);
                    
                    let data = {  
                        "id": originalAdministrador[i].id,
                        "name": "name provisional",
                        "email": api_response.data.email,
                        "document": originalAdministrador[i].document,

                    };
                    auxClient.push(data);
                }
            
                return auxClient
            } else {
                return await Administrador.query()
            }

        }

    }

    public async store({request}:HttpContextContract){
        let body=request.body();
        const theadministrador=await Administrador.create(body);
        return theadministrador;
    }
    public async index({request}: HttpContextContract){
        const page = request.input('page', 1);
        const perPage = request.input('perPage', 20);
        let administrador:Administrador[]= await Administrador.query().paginate(page, perPage)
        return administrador;
    }
    public async show({params}: HttpContextContract){
        return Administrador.findOrFail(params.id);
    }
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theadministrador: Administrador = await Administrador.findOrFail(params.id);
        theadministrador.document= body.document;
        theadministrador.user_id= body.user_id;

        return await theadministrador.save();
    }

    // delete
    public async delete({ params, response }: HttpContextContract) {
        const theadministrador: Administrador = await Administrador.findOrFail(params.id);
        response.status(204);
        return await theadministrador.delete();
    }
}
