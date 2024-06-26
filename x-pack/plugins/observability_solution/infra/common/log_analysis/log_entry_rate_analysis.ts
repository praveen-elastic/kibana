/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import * as rt from 'io-ts';

export const logEntryRateJobTypeRT = rt.literal('log-entry-rate');

export type LogEntryRateJobType = rt.TypeOf<typeof logEntryRateJobTypeRT>;

export const logEntryRateJobType: LogEntryRateJobType = 'log-entry-rate';
export const logEntryRateJobTypes: LogEntryRateJobType[] = [logEntryRateJobType];
