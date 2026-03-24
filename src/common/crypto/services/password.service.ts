import { Injectable } from '@nestjs/common';

import { CryptoService } from './crypto.service';

@Injectable()
export class PasswordService {
  constructor(private readonly crypto: CryptoService) {}

  hash(password: string): Promise<string> {
    return this.crypto.hashArgon2(password);
  }

  verify(hash: string, password: string): Promise<boolean> {
    return this.crypto.verifyArgon2(hash, password);
  }
}
