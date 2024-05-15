import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transfer from 'App/Models/Transfer';

export default class TransfersController {
    public async store({request}:HttpContextContract){
        let body = request.body();
        const theTraslade=await Transfer.create(body)
        return theTraslade;
    }
    public async index({request}: HttpContextContract){
        const page =request.input('page', 1);
        const perPage = request.input("per_page", 20)
        let Transfers:Transfer[]=await Transfer.query().paginate(page, perPage)
        return Transfers;
    }
    public async show({params}:HttpContextContract){
        return Transfer.findOrFail(params.id)
    }
    public async update({params, request}: HttpContextContract){
        const body = request.body();
        const theTraslade: Transfer = await Transfer.findOrFail(params.id);
        theTraslade.origin = body.origin;
        theTraslade.destiny = body.destiny;
        theTraslade.plateCar = body.plateCar;
        return theTraslade.save();
    }
    public async destroy({params, response}: HttpContextContract){
        const theTraslade: Transfer = await Transfer.findOrFail(params.id);
        response.status(204);
        return theTraslade.delete()
    }
}
