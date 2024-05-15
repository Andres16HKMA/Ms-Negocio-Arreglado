import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Titular from 'App/Models/Titular';

export default class TitularController {
    public async store({request}:HttpContextContract){
        let body = request.body();
        const theTitular=await Titular.create(body)
        return theTitular;
    }
    public async index({request}: HttpContextContract){
        const page =request.input('page', 1);
        const perPage = request.input("per_page", 20)
        let Titulars:Titular[]=await Titular.query().paginate(page, perPage)
        return Titulars;
    }
    public async show({params}:HttpContextContract){
        return Titular.findOrFail(params.id)
    }
    public async update({params, request}: HttpContextContract){
        const body = request.body();
        const theTitular: Titular = await Titular.findOrFail(params.id);
        theTitular.state = body.state;
        return theTitular.save();
    }
    public async destroy({params, response}: HttpContextContract){
        const theTitular: Titular = await Titular.findOrFail(params.id);
        response.status(204);
        return theTitular.delete()
    }
}
