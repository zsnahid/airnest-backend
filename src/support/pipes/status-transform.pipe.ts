import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { SupportTicketStatus } from '../entities/supportTicket.entity';

@Injectable()
export class StatusTransformPipe implements PipeTransform {
  transform(value: any) {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }

    // Convert to string for consistent handling
    const stringValue = String(value).trim();

    // Check if it's a pure number (e.g., "0", "1", "2", "3")
    const numericValue = Number(stringValue);
    if (!isNaN(numericValue)) {
      // Verify it's a valid enum value
      if (SupportTicketStatus[numericValue] !== undefined) {
        return numericValue;
      }
    }

    // Check if it's a string key (e.g., "OPEN", "CLOSED")
    const stringKey = stringValue.toUpperCase();
    const enumValue =
      SupportTicketStatus[stringKey as keyof typeof SupportTicketStatus];

    if (enumValue !== undefined) {
      return enumValue;
    }

    // Generate error message with allowed values
    const allowedValues = Object.keys(SupportTicketStatus)
      .filter((k) => isNaN(Number(k)))
      .join(', ');

    throw new BadRequestException(
      `Invalid status: '${value}'. Allowed values are: ${allowedValues}`,
    );
  }
}
