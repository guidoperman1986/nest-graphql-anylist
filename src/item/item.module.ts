import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemResolver } from './item.resolver';
import { Item } from './entities/item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ItemResolver, ItemService],
  imports: [TypeOrmModule.forFeature([Item])],
})
export class ItemModule {}
