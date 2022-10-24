import { DeleteResult, EntityRepository,  Like,  ObjectID,  UpdateResult, InsertResult, SaveOptions } from "typeorm";
import { User } from "../entities/User";
import { UserDto, UserEditDto  } from "../entities/dto/UserDto"
import { ListPaginate } from "../entities/dto/GeneralDto"
import { MongoDataSource } from "../configs/db";

class UserRepository{
    private repository = MongoDataSource.getRepository(User);

    public async findByDto(params: UserDto): Promise<User | null> {
        let options = {};
        options = params
        const firstUser = await this.repository.findOneBy(options);
        return firstUser;
    };

    public async findCredenciales(username: string, password:string ): Promise<User | null> {
        let options = {};
        options = {
            "username":username,
            "password":password,
        }
        const firstUser = await this.repository.findOneBy(options);
        return firstUser;
    };

    public async findAll(limit:number, page:number): Promise<ListPaginate | null> {
        const take = limit ||10;
        const skip = page ||0;
        const [result, total] = await this.repository.findAndCount({
            where: { estado: 'A' },
            take:take,
            skip:(skip * take),
            order: {
                fechaRegistro: "DESC",
            }
        });
        return {
            data: result,
            count: total
        }
    };

    public async findById(params: string): Promise<User | null> {
        const firstUser = await this.repository.findOneById(params);
        return firstUser;
    };

    public async desactivar(userId: string): Promise<UpdateResult> {
        const firstUser = await this.repository.update(userId, { estado: 'D' });
        return firstUser;
    };

    public async actualizar(userId: string, param: UserEditDto): Promise<UpdateResult> {
        const firstUser = await this.repository.update(userId, param);
        return firstUser;
    };

    public async deleteUser(params: User): Promise<DeleteResult> {
        const firstUser = await this.repository.delete(new ObjectID(params.id.toHexString()));
        return firstUser;
    };

    public async save(params: User): Promise<User> {
        const firstUser = await this.repository.save(params);
        return firstUser;
    };
}
export default new UserRepository();