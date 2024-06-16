import { ValidationPipe } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

export const validationPipe = new ValidationPipe({
  exceptionFactory: (errors) => {
    const formattedErrors = errors.map((error) => ({
      property: error.property,
      message: Object.values(error.constraints)[0],
    }));
    return new BadRequestException({
      statusCode: 400,
      message: 'Validation failed',
      errors: formattedErrors,
    });
  },
  stopAtFirstError: true,
});
