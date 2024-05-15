import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hall from 'App/Models/Hall';
import HallValidator from 'App/Validators/HallValidator';

export default class HallsController {
    // create
    public async store({request}:HttpContextContract){
        const body = await request.validate(HallValidator)
        const theHall=await Hall.create(body);
        return theHall;
    }

    // get
    public async index({request}: HttpContextContract){
        const page = request.input('page', 1);
        const perPage = request.input('perPage', 20);
        let halls:Hall[]= await Hall.query().paginate(page, perPage)
        return halls;
    }
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theHall = await Hall.findOrFail(params.id);
            await theHall.load("site")

            return theHall;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Hall.query().paginate(page, perPage)
            } else {
                return await Hall.query()
            }

        }

    }

    // update
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theHall: Hall = await Hall.findOrFail(params.id);
        theHall.capacity = body.capacity;
        return await theHall.save();
    }

    // delete
    public async delete({ params, response }: HttpContextContract) {
        const theHall: Hall = await Hall.findOrFail(params.id);
        response.status(204);
        return await theHall.delete();
    }
}
