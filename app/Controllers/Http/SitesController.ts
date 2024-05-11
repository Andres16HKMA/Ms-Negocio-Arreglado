import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Site from 'App/Models/Site';

export default class SitesController {
    // create
    public async store({request}:HttpContextContract){
        let body=request.body();
        const theSite=await Site.create(body);
        return theSite;
    }

    // get
    public async index({request}: HttpContextContract){
        const page = request.input('page', 1);
        const perPage = request.input('perPage', 20);
        let sites:Site[]= await Site.query().paginate(page, perPage)
        return sites;
    }
    public async show({params}: HttpContextContract){
        return Site.findOrFail(params.id);
    }

    // update
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theSite: Site = await Site.findOrFail(params.id);
        theSite.direction = body.direction;
        theSite.name = body.name;
        return await theSite.save();
    }

    // delete
    public async delete({ params, response }: HttpContextContract) {
        const theSite: Site = await Site.findOrFail(params.id);
        response.status(204);
        return await theSite.delete();
    }
}
