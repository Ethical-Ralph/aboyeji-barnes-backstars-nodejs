/* eslint-disable class-methods-use-this */
import { Sequelize } from 'sequelize';
import Response from '../utils/response';
import RequestService from '../services/requestService';
import Search from '../utils/search';

const { Op } = Sequelize;

/** Class that handles searching requests */
class SearchController {
  /**
   * user can search request by parameter
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {next} next - next middleware
   * @returns {object} search results
   */
  async searchRequests(req, res, next) {
    try {
      // object that will be passed to the db where clause
      const searchDb = {};
      // object passed to search class
      const filters = {};
      const field = req.query;

      const fieldKeys = Object.keys(field);

      const keysToSkip = [
        'requester',
        'travelDate',
        'returnDate',
        'accommodation',
        'destination'
      ];

      fieldKeys.forEach((key) => {
        if (key === 'id' || key === 'userId') {
          searchDb[key] = { [Op.eq]: field[key] };
        } else if (!keysToSkip.includes(key)) {
          searchDb[key] = { [Op.iLike]: `%${field[key].trim()}%` };
        } else {
          filters[key] = field[key].trim();
        }
      });

      // Making the user only get their requests
      if (req.user.userRoles !== 'Manager') {
        searchDb.userId = { [Op.eq]: req.user.id };
      }

      let data = await RequestService.search(searchDb);

      data = data.map((el) => el.dataValues);

      const results = Search.searchData(data, filters);

      if (results.length === 0) {
        return Response.notFoundError(res, 'Request not found');
      }

      return Response.customResponse(res, 200, 'Request Found', results);
    } catch (error) {
      return next(error);
    }
  }
}

export default new SearchController();
