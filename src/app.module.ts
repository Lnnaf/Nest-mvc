import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path';
import { UserModule } from './model/user/user.module';
import { PostModule } from './model/post/post.module';
import { ConfigModule } from '@nestjs/config';
import { CouterSeqModule } from './couter-seq/couter-seq.module';
import { UlityModule } from './ulity/ulity.module';

@Module({
  imports: [
    UlityModule,
    CouterSeqModule,
    UserModule,
    PostModule,
    TypeOrmModule.forRoot({
    name: 'default',
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'system_db_bds',
    useNewUrlParser: true,
    autoLoadEntities: true,
    useUnifiedTopology:true,
    synchronize: true,
    entities: [join(__dirname, '**/**.entity{.ts,.js}')]
  }),
  ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
