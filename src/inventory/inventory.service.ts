import { Injectable } from '@nestjs/common';
import { Inventory } from './entities/inventory.entity';
import { FindManyOptions, FindOneOptions, Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryInput } from './dto/inventory.input';
import { InventoryInputFilter } from './dto/inventory-filter.input';

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
     *  Function getInventoryByFilters
     *  return inventory by filters
     * 
     *  @return Inventory
     * 
     */
    async getInventoryByFilters(inventoryInputFilter: InventoryInputFilter): Promise<Inventory[]> {
        const options: FindManyOptions<Inventory> = {
            where: {}
        };

        if(inventoryInputFilter.category)
            options.where = {...options.where, category: Like(`%${inventoryInputFilter.category}%`)};

        if(inventoryInputFilter.description)
            options.where = {...options.where, description: Like(`%${inventoryInputFilter.description}%`)};

        if(inventoryInputFilter.iva)
            options.where = {...options.where, iva: inventoryInputFilter.iva};
                
        if(inventoryInputFilter.type)
            options.where = {...options.where, type: inventoryInputFilter.type};
        
        if(inventoryInputFilter.note)
            options.where = {...options.where, note: Like(`%${inventoryInputFilter.note}%`)};
        
        if(inventoryInputFilter.um)
            options.where = {...options.where, um: inventoryInputFilter.um};

        if(inventoryInputFilter.active_status)
            options.where = {...options.where, active_status: inventoryInputFilter.active_status};    
            
        return await this.repositoryInventory.find(options);
    }

    /**
     * 
     *  Function getInventoryById
     *  return inventory by id
     * 
     *  @param _id
     * 
     *  @return Inventory
     * 
     */
    async getInventoryById(_id: string): Promise<Inventory> {
        const options: FindOneOptions<Inventory> = { where: { _id } };
        return await this.repositoryInventory.findOne(options);
    }


    /**
     * 
     *  Function createInventory
     *  insert a inventory in db
     * 
     *  @param InventoryInput
     * 
     *  @return Inventory
     * 
     */
    async createInventory(InventoryInput: InventoryInput): Promise<Inventory> {
        const inventory = this.repositoryInventory.create(InventoryInput);
        return await this.repositoryInventory.save(inventory);
    }

}
