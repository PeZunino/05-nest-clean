import { Either, right } from '@/core/either';
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

interface ListQuestionCommentsUseCaseRequest {
	questionId: string
	page: number
}

type ListQuestionCommentsUseCaseResponse = Either<null,{
	questionComments: QuestionComment[]
}>

export class ListQuestionCommentsUseCase {
	constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

	async execute({
		questionId,
		page,
	}: ListQuestionCommentsUseCaseRequest): Promise<ListQuestionCommentsUseCaseResponse> {
		const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {page,});

		return right({questionComments});
	}
}