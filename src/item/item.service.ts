import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemInput } from './dto/inputs/create-item.input';
import { UpdateItemInput } from './dto/inputs/update-item.input';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemsRepository: Repository<Item>,
  ) {}

  async create(createItemInput: CreateItemInput): Promise<Item> {
    const newItem = await this.itemsRepository.create(createItemInput);
    console.log(newItem);
    return await this.itemsRepository.save(newItem);
  }

  async findAll(): Promise<Item[]> {
    return this.itemsRepository.find();
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({ id });

    if (!item) throw new NotFoundException('Item not found');

    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    const item = await this.itemsRepository.preload(updateItemInput);

    if (!item) throw new NotFoundException('Item not found');

    return this.itemsRepository.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.itemsRepository.delete(item);

    return { ...item, id };
  }
}
