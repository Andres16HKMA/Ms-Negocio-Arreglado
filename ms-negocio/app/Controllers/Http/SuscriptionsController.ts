import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Suscription from 'App/Models/Suscription';

export default class SuscriptionsdController {
    public async store({request}:HttpContextContract){
        let body = request.body();
        const theSuscription=await Suscription.create(body)
        return theSuscription;
    }
    public async index({request}: HttpContextContract){
        const page =request.input('page', 1);
        const perPage = request.input("per_page", 20)
        let suscription:Suscription[]=await Suscription.query().paginate(page, perPage)
        return suscription;
    }
    public async show({params}:HttpContextContract){
        return Suscription.findOrFail(params.id)
    }
    public async update({params, request}: HttpContextContract){
        const body = request.body();
        const theTraslade: Suscription = await Suscription.findOrFail(params.id);
        theTraslade.state = body.state;
        return theTraslade.save();
    }
    public async destroy({params, response}: HttpContextContract){
        const theTraslade: Suscription = await Suscription.findOrFail(params.id);
        response.status(204);
        return theTraslade.delete()
    }
}
