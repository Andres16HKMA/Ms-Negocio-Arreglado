import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Clients from 'App/Models/Client';
import ClientValidator from 'App/Validators/ClientValidator';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env'

export default class ClientssController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let TheClient = await Clients.findOrFail(params.id);
            await TheClient.load("beneficier")
            return TheClient;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                let auxClient: {}[] = [];

                let originalClient: Clients[] = await Clients.query().preload("beneficier").paginate(page, perPage);
                for (let i = 0; i < originalClient.length; i++) {
                    let api_response = await axios.get(`${Env.get('MS_SECURITY')}/api/public/user/`+originalClient[i].user_id);
                    
                    let data = {  
                        "id": originalClient[i].id,
                        "name": api_response.data.name,
                        "email": api_response.data.email,
                        "celphone": originalClient[i].celphone,
                        "document": originalClient[i].document,
                    };
                    auxClient.push(data);
                }
            
                return auxClient
            } else {
                return await Clients.query().preload("beneficier")
            }

        }

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
