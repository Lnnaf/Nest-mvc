import { Module } from '@nestjs/common';
import { CouterSeqService } from './couter-seq.service';
import { CouterSeqController } from './couter-seq.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouterSeq } from './entities/couter-seq.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CouterSeq])],
  controllers: [CouterSeqController],
  providers: [CouterSeqService],
  exports: [CouterSeqService]
})
export class CouterSeqModule {}
