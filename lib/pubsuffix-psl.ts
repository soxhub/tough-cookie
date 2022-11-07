/*!
 * Copyright (c) 2018, Salesforce.com, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of Salesforce.com nor the names of its contributors may
 * be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
"use strict";
import * as psl from 'psl'

// RFC 6761
const SPECIAL_USE_DOMAINS = [
  "local",
  "example",
  "invalid",
  "localhost",
  "test"
];

type GetPublicSuffixOptions = {
  allowSpecialUseDomain?: boolean | undefined;
  ignoreError?: boolean | undefined;
}

const defaultGetPublicSuffixOptions: GetPublicSuffixOptions = {
  allowSpecialUseDomain: false,
  ignoreError: false
}

export function getPublicSuffix(domain: string, options: GetPublicSuffixOptions = {}): string | null {
  options = { ...defaultGetPublicSuffixOptions, ...options }
  const domainParts = domain.split(".");
  const topLevelDomain = domainParts[domainParts.length - 1];
  const allowSpecialUseDomain = !!options.allowSpecialUseDomain;
  const ignoreError = !!options.ignoreError;

  if (
    allowSpecialUseDomain &&
    domainParts.length > 1 &&
    typeof topLevelDomain === 'string' &&
    SPECIAL_USE_DOMAINS.includes(topLevelDomain)
  ) {
    // If the right-most label in the name is a special-use domain (e.g. bananas.apple.localhost),
    // then don't use PSL. This is because most special-use domains are not listed on PSL.
    const secondLevelDomain = domainParts[domainParts.length - 2];
    // In aforementioned example, the eTLD/pubSuf will be apple.localhost
    return `${secondLevelDomain}.${topLevelDomain}`;
  }

  if (!ignoreError && typeof topLevelDomain === 'string' && SPECIAL_USE_DOMAINS.includes(topLevelDomain)) {
    throw new Error(
      `Cookie has domain set to the public suffix "${topLevelDomain}" which is a special use domain. To allow this, configure your CookieJar with {allowSpecialUseDomain:true, rejectPublicSuffixes: false}.`
    );
  }

  return psl.get(domain);
}