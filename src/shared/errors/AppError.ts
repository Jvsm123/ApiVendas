//Classe de erros padrões no projeto
class AppError {
	public readonly message: string;
	public readonly statusCode: number;

	constructor(message: string, statusCode: number = 400) {
		this.message = message;
		this.statusCode = statusCode;
	}
}

export default AppError
