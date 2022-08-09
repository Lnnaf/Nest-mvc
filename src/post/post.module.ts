import { forwardRef, Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { CouterSeqModule } from '../couter-seq/couter-seq.module';
import { AuthModule } from '../auth/auth.module';
import { UlityService } from '../ulity/ulity.service';


@Module({
  imports: [
    AuthModule,
    CouterSeqModule, 
    TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostController],
  providers: [PostService, UlityService],
  exports: [PostService]
})
export class PostModule {}
