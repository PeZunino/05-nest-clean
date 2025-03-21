import { Injectable } from '@nestjs/common';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository{
	constructor(private prisma:PrismaService){}
	
	save(question: Question): Promise<void> {
		throw new Error('Method not implemented.');
	}
	findManyRecent(params: PaginationParams): Promise<Question[]> {
		throw new Error('Method not implemented.');
	}
	create(question: Question): Promise<void> {
		throw new Error('Method not implemented.');
	}
	findBySlug(slug: string): Promise<Question | null> {
		throw new Error('Method not implemented.');
	}
	async findById(id: string): Promise<Question | null> {
		const question = await this.prisma.question.findUnique({where:{id}});

		if(!question){
			return null; 
		}

		return PrismaQuestionMapper.toDomain(question);
	}
	delete(question: Question): Promise<void> {
		throw new Error('Method not implemented.');
	}
  

}