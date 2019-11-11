import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'necessário token de autenticação' });
  }
  const [, token] = authHeader.split(' ');

  try {
    const decode = promisify(jwt.verify);
    const decoded = await decode(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'token inválido' });
  }
};
