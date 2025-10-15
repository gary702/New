import { YouTrackIssue } from './youtrack';

interface DocumentTemplate {
  title: string;
  content: string;
  type: 'product' | 'feature';
  tags: string[];
}

export class DocumentGenerator {
  private static extractTags(issue: YouTrackIssue): string[] {
    const tags = [];
    
    // Extract tags from custom fields
    issue.customFields?.forEach(field => {
      if (field.name.toLowerCase().includes('tag') || 
          field.name.toLowerCase().includes('label')) {
        if (Array.isArray(field.value)) {
          tags.push(...field.value.map(v => v.name || v));
        } else if (field.value) {
          tags.push(field.value.name || field.value);
        }
      }
    });

    return tags;
  }

  private static determineDocumentType(issue: YouTrackIssue): 'product' | 'feature' {
    // Check if issue has product-related tags or subsystems
    const isProduct = issue.customFields?.some(field => {
      const value = field.value?.name?.toLowerCase() || field.value?.toLowerCase() || '';
      return value.includes('product') || value.includes('epic');
    });

    return isProduct ? 'product' : 'feature';
  }

  private static formatDescription(description: string): string {
    // Convert YouTrack markdown to our format
    return description
      .replace(/\|!\|/g, '###') // Headers
      .replace(/\|\|/g, '##')   // Subheaders
      .replace(/\{code\}/g, '```'); // Code blocks
  }

  static generateFromIssue(issue: YouTrackIssue): DocumentTemplate {
    const tags = this.extractTags(issue);
    const type = this.determineDocumentType(issue);
    
    const content = `
# ${issue.summary}

${this.formatDescription(issue.description)}

## Technical Details
- Issue ID: ${issue.idReadable}
- Created: ${new Date(issue.created).toISOString()}
- Last Updated: ${new Date(issue.updated).toISOString()}

## Implementation Notes
${issue.customFields
  ?.filter(field => field.name.toLowerCase().includes('implementation') || 
                   field.name.toLowerCase().includes('technical'))
  ?.map(field => `### ${field.name}\n${field.value}`)
  ?.join('\n\n') || 'No implementation notes available.'}
`;

    return {
      title: issue.summary,
      content: content.trim(),
      type,
      tags,
    };
  }
}