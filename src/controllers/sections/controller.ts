/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import Knex from '../../shared/knex';
import { success } from '../../shared/response-map';
import { Tables } from '../../shared/knex/knex';

const { sections, sectionContent, socialMediaLinks, contactDetails, newsletterSubscriptions } = Tables;

class SectionController {
  async getSectionsWithContent(req: Request, res: Response, next: NextFunction) {
    try {
      const [sectionsData, contentData] = await Promise.all([
        Knex.generateKnexQuery({ table: sections }),
        Knex.generateKnexQuery({ table: sectionContent }),
      ]);

      const result = sectionsData.map((section: any) => {
        return {
          ...section,
          content: contentData.filter(
            (content: any) => content.sectionId === section.id,
          ),
        };
      });

      success(req, res, result);
    } catch (err) {
      next(err);
    }
  }

  async getFooterDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const [socialMediaData, contactData] = await Promise.all([
        Knex.generateKnexQuery({
          table: socialMediaLinks,
          where: { section_id: id },
        }),
        Knex.generateKnexQuery({
          table: contactDetails,
          where: { section_id: id },
        }),
      ]);

      const result = {
        social_media_links: socialMediaData,
        contact_details: contactData,
      };

      success(req, res, result);
    } catch (err) {
      next(err);
    }
  }

  async createSectionContent(req: Request, res: Response, next: NextFunction) {
    try {
      const { section_id, title, description } = req.body;

      await Knex.generateKnexQuery({
        table: sectionContent,
        insert: {
          section_id,
          title,
          description,
        },
      });

      success(req, res, 'content created successfully');
    } catch (err) {
      next(err);
    }
  }

  async updateSectionContent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { section_id, title, description } = req.body;

      await Knex.generateKnexQuery({
        table: sectionContent,
        where: { id },
        update: {
          section_id,
          title,
          description,
        },
      });

      success(req, res, 'content updated successfully');
    } catch (err) {
      next(err);
    }
  }

  async deleteSectionContent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await Knex.generateKnexQuery({
        table: sectionContent,
        where: { id },
        del: true,
      });

      success(req, res, { message: 'Section content deleted successfully.' });
    } catch (err) {
      next(err);
    }
  }

  async createSocialMediaLink(req: Request, res: Response, next: NextFunction) {
    try {
      const { section_id, platform_name, url } = req.body;

      await Knex.generateKnexQuery({
        table: socialMediaLinks,
        insert: {
          section_id,
          platform_name,
          url,
        },
      });

      success(req, res, 'media created successfully');
    } catch (err) {
      next(err);
    }
  }

  async updateSocialMediaLink(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { section_id, platform_name, url } = req.body;

      await Knex.generateKnexQuery({
        table: socialMediaLinks,
        where: { id },
        update: {
          section_id,
          platform_name,
          url,
        },
      });

      success(req, res, 'media updated successfully');
    } catch (err) {
      next(err);
    }
  }

  async deleteSocialMediaLink(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await Knex.generateKnexQuery({
        table: socialMediaLinks,
        where: { id },
        del: true,
      });

      success(req, res, { message: 'Social media link deleted successfully.' });
    } catch (err) {
      next(err);
    }
  }

  async createContactDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const { section_id, contact_type, value } = req.body;

      await Knex.generateKnexQuery({
        table: contactDetails,
        insert: {
          section_id,
          contact_type,
          value,
        },
      });

      success(req, res, 'contact created successfully');
    } catch (err) {
      next(err);
    }
  }

  async updateContactDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { section_id, contact_type, value } = req.body;

      await Knex.generateKnexQuery({
        table: contactDetails,
        where: { id },
        update: {
          section_id,
          contact_type,
          value,
        },
      });

      success(req, res, 'contact updated successfully');
    } catch (err) {
      next(err);
    }
  }

  async deleteContactDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await Knex.generateKnexQuery({
        table: contactDetails,
        where: { id },
        del: true,
      });

      success(req, res, { message: 'Contact detail deleted successfully.' });
    } catch (err) {
      next(err);
    }
  }

  async createNewsletterSubscription(req: Request, res: Response, next: NextFunction) {
    try {
      const { section_id, email } = req.body;

      await Knex.generateKnexQuery({
        table: newsletterSubscriptions,
        insert: {
          section_id,
          email,
        },
      });

      success(req, res, 'subscription created successfully');
    } catch (err) {
      next(err);
    }
  }

  async updateNewsletterSubscription(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { section_id, email } = req.body;

      await Knex.generateKnexQuery({
        table: newsletterSubscriptions,
        where: { id },
        update: {
          section_id,
          email,
        },
      });

      success(req, res, 'subscription updated successfully');
    } catch (err) {
      next(err);
    }
  }

  async deleteNewsletterSubscription(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await Knex.generateKnexQuery({
        table: newsletterSubscriptions,
        where: { id },
        del: true,
      });

      success(req, res, { message: 'Newsletter subscription deleted successfully.' });
    } catch (err) {
      next(err);
    }
  }
  async updateSection(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { section_name, sub_section_name, is_visible, display_order } = req.body;
  
      await Knex.generateKnexQuery({
        table: sections,
        where: { id },
        update: {
          section_name,
          sub_section_name,
          is_visible,
          display_order,
        },
      });
  
      success(req, res, 'Section updated successfully');
    } catch (err) {
      next(err);
    }
  }
  
  async deleteSection(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await Knex.generateKnexQuery({
        table: sections,
        where: { id },
        del: true,
      });
  
      success(req, res, { message: 'Section deleted successfully' });
    } catch (err) {
      next(err);
    }
  }
  
}

const instance = new SectionController();
export default instance;
