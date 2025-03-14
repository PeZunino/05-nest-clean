import { Body, Controller, Post, UseGuards, } from '@nestjs/common';
import { z } from 'zod';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

const createQuestionBodySchema = z.object({
	content: z.string(),
	title: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController{

	constructor(
		private prisma: PrismaService
	){}

	@Post()
	async handle(
		@Body(bodyValidationPipe) body:CreateQuestionBodySchema,
		@CurrentUser() user:UserPayload
	){
		const {
			content,title
		} = body;

		const userId = user.sub;

		const slug = this.convertToSlug(title);

		await this.prisma.question.create({
			data:{
				authorId:userId,
				title,
				content,
				slug
			}
		});
	}

	private convertToSlug(title: string): string {
		return title
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^\w\s-]/g, '')
			.replace(/\s+/g, '-');
	}
}