import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Fertro from 'App/Models/Fertro';
import FertroValidator from 'App/Validators/FertroValidator';

export default class FertrosController {
    public async store({request}:HttpContextContract){
        const body = await request.validate(FertroValidator)
        const theFertro=await Fertro.create(body)
        return theFertro;
    }
    public async show({params}:HttpContextContract){
        return Fertro.findOrFail(params.id)
    }
}
