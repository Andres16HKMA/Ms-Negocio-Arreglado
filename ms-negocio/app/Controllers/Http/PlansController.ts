import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Plan from 'App/Models/Plan';

export default class PlansController {

    // Create
    public async store({request}:HttpContextContract){
        let body=request.body();
        const thePlan=await Plan.create(body);
        return thePlan;
    }

      // get
      public async index({request}: HttpContextContract){
        const page = request.input('page', 1);
        const perPage = request.input('perPage', 20);
        let plans:Plan[]= await Plan.query().paginate(page, perPage)
        return plans;
    }
    public async show({params}: HttpContextContract){
        return Plan.findOrFail(params.id);
    }

     // update
     public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const thePlan: Plan = await Plan.findOrFail(params.id);
        thePlan.plan_type = body.plan_type;
        thePlan.cantidadbeneficiers = body.cantidadbeneficiers;

        return await thePlan.save();
    }
    

    // delete
    public async delete({ params, response }: HttpContextContract) {
        const thePlan: Plan = await Plan.findOrFail(params.id);
        response.status(204);
        return await thePlan.delete();
    }
    





}
