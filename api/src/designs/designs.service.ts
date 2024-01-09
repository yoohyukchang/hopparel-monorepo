import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Design } from './design.entity';
import { Repository } from 'typeorm';
import { CreateDesignDto } from './create-design.dto';
import { UpdateDesignDto } from './update-design.dto';

@Injectable()
export class DesignsService {
    constructor(
        @InjectRepository(Design)
        private designRepository: Repository<Design>,
    ) {}

    // create a new design
    async createDesign(createDesignDto: CreateDesignDto, userId: number): Promise<Design> {
        const design = await this.designRepository.create({
            ...createDesignDto,
            userId,
        });
        return this.designRepository.save(design);
    }

    // finding all designs of a user
    async findAllDesigns(
        limit: number, 
        offset: number,
        search?: string,
    ): Promise<Design[]> {
        const queryBuilder = this.designRepository.createQueryBuilder('designs');

        if (search !== undefined) {
            queryBuilder.where('designs.productType ILIKE :search', {
                search: `%${search}%`,
            });
        }

        queryBuilder.limit(limit);
        queryBuilder.offset(offset);

        queryBuilder.orderBy('designs.updatedAt', 'DESC');

        return await queryBuilder.getMany();
    }

    // get one specific design
    async findOneDesign(id: string): Promise<Design | null> {
        return this.designRepository.findOneBy({ id });
    }

    // update a design
    async updateDesign(id: string, updateDesignDto: UpdateDesignDto): Promise<Design | null> {
        const design = await this.designRepository.preload({ id, ...updateDesignDto });
        if (!design) {
            return null;
        }
        return this.designRepository.save(design);
    }

    // delete a design
    async removeDesign(id: string): Promise<Design | null> {
        const design = await this.findOneDesign(id);
        if (!design) {
            return null;
        }
        return this.designRepository.remove(design);
    }
}
