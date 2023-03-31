import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Inventory } from './entities/inventory.entity';
import { InventoryService } from './inventory.service';
import { InventoryInput } from './dto/inventory.input';
import { InventoryInputFilter } from './dto/inventory-filter.input';
import { InventoryInputUpdateData } from './dto/inventory-update.input';


@Resolver((of) => Inventory)
export class InventoryResolver {
    constructor(
        private inventoryService: InventoryService
    ) {}

    @Query((type) => [Inventory])
    async getAllInventorys(): Promise<Inventory[]> {
        return this.inventoryService.getAllInventorys();
    }

    @Query((result) => [Inventory])
    async findInventory(
        @Args('inventoryInputFilter') inventoryInputFilter: InventoryInputFilter
    ): Promise<Inventory[]> {
        return await this.inventoryService.getInventoryByFilters(inventoryInputFilter);
    }

    @Mutation((returns) => Inventory)
    createInventory(
        @Args('inventoryInput') inventoryInput: InventoryInput
    ): Promise<Inventory> {
        return this.inventoryService.createInventory(inventoryInput);
    }

    @Query((returns) => Inventory)
    async getInventoryById(
        @Args('_id') _id: string
    ): Promise<Inventory> {
        return await this.inventoryService.getInventoryById(_id);
    }

    @Mutation((returns) => Inventory)
    async updateInventory(
        @Args('_id') _id: string,
        @Args('updateInventoryData') updateInventoryData: InventoryInputUpdateData
    ): Promise<Inventory> {
        return await this.inventoryService.updateInventory(_id, updateInventoryData);
    }

    @Mutation((returns) => Boolean)
    async deleteInventory(
        @Args('_id') _id: string
    ): Promise<boolean> {
        return await this.inventoryService.deleteInventory(_id);
    }


}
