import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Suscription from 'App/Models/Suscription';
import SuscriptionValidator from 'App/Validators/SuscriptionValidator';

export default class SuscriptionsdController {
    public async store({request}:HttpContextContract){
        const body = await request.validate(SuscriptionValidator)
        const theSuscription=await Suscription.create(body)
        return theSuscription;
    }
    public async index({request}: HttpContextContract){
        const page =request.input('page', 1);
        const perPage = request.input("per_page", 20)
        let suscription:Suscription[]=await Suscription.query().paginate(page, perPage)
        return suscription;
    }
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theSuscription = await Suscription.findOrFail(params.id);
            await theSuscription.load("client")
            await theSuscription.load("plan")


            return theSuscription;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Suscription.query().paginate(page, perPage)
            } else {
                return await Suscription.query()
            }

        }

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
