import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
    type : 'postgres',
    host : 'localhost',
    port : 5432 , 
    username : 'alireza',
    password : 'alireza',
    database : 'taskmanagment',
    entities : [__dirname + '/../**/*/*.entity.ts'],
    synchronize : true
}