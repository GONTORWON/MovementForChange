import axios from 'axios';

interface PostContent {
  title: string;
  excerpt?: string;
  content?: string;
  imageUrl?: string;
  url?: string;
}

export class SocialMediaService {
  // Facebook/Meta Graph API
  async postToFacebook(content: PostContent): Promise<{ success: boolean; postId?: string; error?: string }> {
    try {
      const pageId = process.env.FACEBOOK_PAGE_ID;
      const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

      if (!pageId || !accessToken) {
        throw new Error('Facebook credentials not configured');
      }

      const message = `${content.title}\n\n${content.excerpt || ''}${content.url ? `\n\nRead more: ${content.url}` : ''}`;
      
      const response = await axios.post(
        `https://graph.facebook.com/v23.0/${pageId}/feed`,
        {
          message,
          link: content.url,
          access_token: accessToken,
        }
      );

      return { success: true, postId: response.data.id };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error?.message || error.message 
      };
    }
  }

  // X/Twitter API
  async postToTwitter(content: PostContent): Promise<{ success: boolean; postId?: string; error?: string }> {
    try {
      const accessToken = process.env.TWITTER_ACCESS_TOKEN;

      if (!accessToken) {
        throw new Error('Twitter credentials not configured');
      }

      // Twitter has 280 character limit
      let tweetText = content.title;
      if (content.url) {
        tweetText += `\n\n${content.url}`;
      }
      
      // Truncate if too long (account for URL shortening)
      if (tweetText.length > 280) {
        tweetText = content.title.substring(0, 250) + '...\n\n' + content.url;
      }

      const response = await axios.post(
        'https://api.x.com/2/tweets',
        { text: tweetText },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        }
      );

      return { success: true, postId: response.data.data.id };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message 
      };
    }
  }

  // LinkedIn API
  async postToLinkedIn(content: PostContent): Promise<{ success: boolean; postId?: string; error?: string }> {
    try {
      const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
      const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;

      if (!organizationId || !accessToken) {
        throw new Error('LinkedIn credentials not configured');
      }

      const commentary = `${content.title}\n\n${content.excerpt || ''}`;

      const postData: any = {
        author: `urn:li:organization:${organizationId}`,
        commentary,
        visibility: 'PUBLIC',
        distribution: {
          feedDistribution: 'MAIN_FEED',
        },
        lifecycleState: 'PUBLISHED',
      };

      // Add link if provided
      if (content.url) {
        postData.content = {
          article: {
            source: content.url,
            title: content.title,
            description: content.excerpt || '',
          }
        };
      }

      const response = await axios.post(
        'https://api.linkedin.com/rest/posts',
        postData,
        {
          headers: {
            'LinkedIn-Version': '202408',
            'X-Restli-Protocol-Version': '2.0.0',
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        }
      );

      return { success: true, postId: response.headers['x-restli-id'] };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || error.message 
      };
    }
  }

  async postToAllEnabledPlatforms(
    content: PostContent, 
    platforms: string[]
  ): Promise<{ platform: string; success: boolean; postId?: string; error?: string }[]> {
    const results = [];

    for (const platform of platforms) {
      let result;
      switch (platform) {
        case 'facebook':
          result = await this.postToFacebook(content);
          break;
        case 'twitter':
          result = await this.postToTwitter(content);
          break;
        case 'linkedin':
          result = await this.postToLinkedIn(content);
          break;
        default:
          result = { success: false, error: 'Unknown platform' };
      }
      results.push({ platform, ...result });
    }

    return results;
  }
}

export const socialMediaService = new SocialMediaService();
