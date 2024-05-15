import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Grave from 'App/Models/Grave';
import GraveValidator from 'App/Validators/GraveValidator';

export default class GraveController {
    public async store({request}:HttpContextContract){
        const body = await request.validate(GraveValidator)
        const theGrave=await Grave.create(body)
        return theGrave;
    }
    public async index({request}: HttpContextContract){
        const page =request.input('page', 1);
        const perPage = request.input("per_page", 20)
        let grave:Grave[]=await Grave.query().paginate(page, perPage)
        return grave;
    }
    public async show({params}:HttpContextContract){
        return Grave.findOrFail(params.id)
    }
    public async update({params, request}: HttpContextContract){
        const body = request.body();
        const theGrave: Grave = await Grave.findOrFail(params.id);
        theGrave.name = body.name;
        return theGrave.save();
    }
    public async destroy({params, response}: HttpContextContract){
        const theGrave: Grave = await Grave.findOrFail(params.id);
        response.status(204);
        return theGrave.delete()
    }
}
