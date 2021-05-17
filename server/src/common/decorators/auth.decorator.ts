import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

export const Auth = () => {
  return applyDecorators(
    UseGuards(new JwtAuthGuard()),
    ApiBearerAuth(),
  );
};
