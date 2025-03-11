import { Either, right } from '@/core/either';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';

interface ListAnswerCommentsUseCaseRequest {
	answerId: string
	page: number
}

type ListAnswerCommentsUseCaseResponse = Either<null,{
	answerComments: AnswerComment[]
}>

export class ListAnswerCommentsUseCase {
	constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

	async execute({
		answerId,
		page,
	}: ListAnswerCommentsUseCaseRequest): Promise<ListAnswerCommentsUseCaseResponse> {
		const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {page,});

		return right({answerComments});
	}
}