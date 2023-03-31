import { Injectable } from '@nestjs/common';
import { Inventory } from './entities/inventory.entity';
import { FindManyOptions, FindOneOptions, Repository, Like, Between } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryInput } from './dto/inventory.input';
import { InventoryInputFilter } from './dto/inventory-filter.input';
import { InventoryInputUpdateData } from './dto/inventory-update.input';

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
        
        if(inventoryInputFilter.init_date_int && inventoryInputFilter.end_date_int)
            options.where = {...options.where, createdAt: Between(inventoryInputFilter.init_date_int, inventoryInputFilter.end_date_int) };    
            
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

    /**
     * 
     *  Function updateInventory
     *  function for update inventory data
     *  
     *  @param _id
     *  @param InventoryInputUpdateData 
     *  
     *  @return Inventory
     * 
     */
    async updateInventory(_id: string, updateInventoryData: InventoryInputUpdateData ): Promise<Inventory> {
        await this.repositoryInventory.update(_id, updateInventoryData);
        return this.repositoryInventory.findOne({ where: { _id } });
    } 

    /**
     * 
     *  Function deleteInventory 
     *  for delete inventory from db
     * 
     *  @param _id
     * 
     *  @return boolean
     * 
     */
    async deleteInventory(_id: string): Promise<boolean> {
        const inventory = await this.repositoryInventory.findOne({ where: { _id } });

        if(!inventory)
            throw new Error(`Inventory with ID ${_id} not found`);

        const result = await this.repositoryInventory.update(_id, {
            active_status: false,
            deleteAt: new Date().getTime(),
        });

        return result.affected > 0;
    }

}
