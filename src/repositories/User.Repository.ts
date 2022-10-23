import { DeleteResult, EntityRepository,  Like,  ObjectID,  UpdateResult, InsertResult, SaveOptions } from "typeorm";
import { User } from "../entities/mongo/User";
import { UserDto, UserEditDto  } from "../entities/dto/UserDto"
import { ListPaginate } from "../entities/dto/GeneralDto"
import { MongoDataSource } from "../configs/db";

const userRepository = MongoDataSource.getRepository(User);

export async function findByDto(params: UserDto): Promise<User | null> {
    let options = {};
    options = params
    const firstUser = await userRepository.findOneBy(options);
    return firstUser;
};

export async function findCredenciales(username: string, password:string ): Promise<User | null> {
    let options = {};
    options = {
        "username":username,
        "password":password,
    }
    const firstUser = await userRepository.findOneBy(options);
    return firstUser;
};

export async function findAll(limit:number, page:number): Promise<ListPaginate | null> {
    const take = limit ||10;
    const skip = page ||0;
    const [result, total] = await userRepository.findAndCount({
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

export async function findById(params: string): Promise<User | null> {
    const firstUser = await userRepository.findOneById(params);
    return firstUser;
};

export async function desactivar(userId: string): Promise<UpdateResult> {
    const firstUser = await userRepository.update(userId, { estado: 'D' });
    return firstUser;
};

export async function actualizar(userId: string, param: UserEditDto): Promise<UpdateResult> {
    const firstUser = await userRepository.update(userId, param);
    return firstUser;
};

export async function deleteUser(params: User): Promise<DeleteResult> {
    const firstUser = await userRepository.delete(new ObjectID(params.id.toHexString()));
    return firstUser;
};

export async function save(params: User): Promise<User> {
    const firstUser = await userRepository.save(params);
    return firstUser;
};