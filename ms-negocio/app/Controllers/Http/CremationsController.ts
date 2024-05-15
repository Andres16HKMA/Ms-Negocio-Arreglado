import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cremation from 'App/Models/Cremation';
import CremationValidator from 'App/Validators/CremationValidator';

export default class CremationsController {
    public async store({request}:HttpContextContract){
        const body = await request.validate(CremationValidator)
        const theCremation=await Cremation.create(body)
        return theCremation;
    }
    public async index({request}: HttpContextContract){
        const page =request.input('page', 1);
        const perPage = request.input("per_page", 20)
        let cremation:Cremation[]=await Cremation.query().paginate(page, perPage)
        return cremation;
    }
    public async show({params}:HttpContextContract){
        return Cremation.findOrFail(params.id)
    }
    public async update({params, request}: HttpContextContract){
        const body = request.body();
        const theCremation: Cremation = await Cremation.findOrFail(params.id);
        theCremation.name = body.name;
        return theCremation.save();
    }
    public async destroy({params, response}: HttpContextContract){
        const theCremation: Cremation = await Cremation.findOrFail(params.id);
        response.status(204);
        return theCremation.delete()
    }
}
