import * as express from 'express';
import controller from './controller';

const router = express.Router();
const { getSectionsWithContent, getFooterDetails, createSectionContent, updateSectionContent, 
  deleteSectionContent, createContactDetail, updateContactDetail, deleteContactDetail, 
  createNewsletterSubscription, updateNewsletterSubscription, deleteNewsletterSubscription,
  updateSection, deleteSection, createSocialMediaLink, updateSocialMediaLink, deleteSocialMediaLink } = controller;

router.get('/sections', getSectionsWithContent);
router.put('/sections/:id', updateSection);
router.delete('/sections/:id', deleteSection);
router.get('/footer/:id', getFooterDetails);
router.post('/createSectionContent', createSectionContent);
router.put('/updateSectionContent/:id', updateSectionContent);
router.delete('/deleteSectionContent/:id', deleteSectionContent);

router.post('/createContactDetail', createContactDetail); 
router.put('/updateContactDetail/:id', updateContactDetail);
router.delete('/deleteContactDetail/:id', deleteContactDetail);

router.post('/createSocialMedia', createSocialMediaLink); 
router.put('/updateSocialMedia/:id', updateSocialMediaLink);
router.delete('/deleteSocialMedia/:id', deleteSocialMediaLink);

router.post('/createNewsletterSubscription', createNewsletterSubscription);
router.put('/updateNewsletterSubscription/:id', updateNewsletterSubscription);
router.delete('/deleteNewsletterSubscription/:id', deleteNewsletterSubscription); 

export default router;