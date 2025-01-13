/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import Knex from '../../shared/knex';
import { success } from '../../shared/response-map';
import { Tables } from '../../shared/knex/knex';

const { sections, sectionContent, socialMediaLinks, contactDetails } = Tables;

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
}

const instance = new SectionController();
export default instance;
