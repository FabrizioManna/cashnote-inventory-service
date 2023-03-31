import { Injectable } from '@nestjs/common';
import { Inventory } from './entities/inventory.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryInput } from './dto/inventory.input';

@Injectable()
/**
 * Class for comunication with db
 * this is used for CRUD operation
 * contain business logic
 *
 * @author Manna Fabrizio <mannafabrizio83@gmail.com>
 *
 */
export class InventoryService {
    constructor(
        @InjectRepository(Inventory)
        private repositoryInventory: Repository<Inventory>
    ) {}

    /**
     * 
     *  Function getAllInventorys
     *  return all inventory not delete with status true
     * 
     *  @return Inventory[]
     * 
     */
    async getAllInventorys(): Promise<Inventory[]> {
        return await this.repositoryInventory.find({
            where: {
                active_status: true,
            }
        });
    }

    /**
     * 
     *  Function createInventory
     *  insert a invectory in db
     * 
     *  @return Inventory
     * 
     */
    async createInventory(InventoryInput: InventoryInput): Promise<Inventory> {
        const inventory = this.repositoryInventory.create(InventoryInput);
        return await this.repositoryInventory.save(inventory);
    }
}
