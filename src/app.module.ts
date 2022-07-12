import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path';
import { UserModule } from './model/user/user.module';
import { PostModule } from './model/post/post.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
    name: 'default',
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'system_db_bds',
    useNewUrlParser: true,
    autoLoadEntities: true,
    useUnifiedTopology:true,
    entities: [join(__dirname, '**/**.entity{.ts,.js}')]
  }),
  PostModule,
  ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
