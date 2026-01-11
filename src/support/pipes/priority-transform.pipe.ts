import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { SupportTicketPriority } from '../entities/supportTicket.entity';

@Injectable()
export class PriorityTransformPipe implements PipeTransform {
  transform(value: any) {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }

    // Convert to string for consistent handling
    const stringValue = String(value).trim();

    // Check if it's a pure number
    const numericValue = Number(stringValue);
    if (!isNaN(numericValue)) {
      // Verify it's a valid enum value
      if (SupportTicketPriority[numericValue] !== undefined) {
        return numericValue;
      }
    }

    // Check if it's a string key (e.g., "LOW", "high")
    const stringKey = stringValue.toUpperCase();
    const enumValue =
      SupportTicketPriority[stringKey as keyof typeof SupportTicketPriority];

    if (enumValue !== undefined) {
      return enumValue;
    }

    // Generate error message with allowed values
    const allowedValues = Object.keys(SupportTicketPriority)
      .filter((k) => isNaN(Number(k)))
      .join(', ');

    throw new BadRequestException(
      `Invalid priority: '${value}'. Allowed values are: ${allowedValues}`,
    );
  }
}
