/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { FormattedMessage } from '@kbn/i18n-react';

import { REPOSITORY_TYPES } from '../../../../../common';
import { Repository, RepositoryType, EmptyRepository } from '../../../../../common/types';
import { SectionError } from '../../../../shared_imports';
import { useServices } from '../../../app_context';
import { RepositorySettingsValidation } from '../../../services/validation';

import { AzureSettings } from './azure_settings';
import { FSSettings } from './fs_settings';
import { GCSSettings } from './gcs_settings';
import { HDFSSettings } from './hdfs_settings';
import { ReadonlySettings } from './readonly_settings';
import { S3Settings } from './s3_settings';

interface Props {
  repository: Repository | EmptyRepository;
  isManagedRepository?: boolean;
  updateRepository: (updatedFields: Partial<Repository>) => void;
  settingErrors: RepositorySettingsValidation;
}

export const TypeSettings: React.FunctionComponent<Props> = ({
  repository,
  isManagedRepository,
  updateRepository,
  settingErrors,
}) => {
  const { i18n } = useServices();
  const { type, settings } = repository;
  const updateRepositorySettings = (
    updatedSettings: Partial<Repository['settings']>,
    replaceSettings?: boolean
  ): void => {
    if (replaceSettings) {
      updateRepository({
        settings: updatedSettings,
      });
    } else {
      updateRepository({
        settings: {
          ...settings,
          ...updatedSettings,
        },
      });
    }
  };

  const typeSettingsMap: { [key: string]: any } = {
    [REPOSITORY_TYPES.fs]: FSSettings,
    [REPOSITORY_TYPES.url]: ReadonlySettings,
    [REPOSITORY_TYPES.azure]: AzureSettings,
    [REPOSITORY_TYPES.gcs]: GCSSettings,
    [REPOSITORY_TYPES.hdfs]: HDFSSettings,
    [REPOSITORY_TYPES.s3]: S3Settings,
  };

  const renderTypeSettings = (repositoryType: RepositoryType | null) => {
    if (!repositoryType) {
      return null;
    }

    const RepositorySettings = typeSettingsMap[repositoryType];
    if (RepositorySettings) {
      return (
        <RepositorySettings
          repository={repository}
          isManagedRepository={isManagedRepository}
          updateRepositorySettings={updateRepositorySettings}
          settingErrors={settingErrors}
        />
      );
    }
    return (
      <SectionError
        title={
          <FormattedMessage
            id="xpack.snapshotRestore.repositoryForm.errorUnknownRepositoryTypesTitle"
            defaultMessage="Unknown repository type"
          />
        }
        error={{
          error: i18n.translate(
            'xpack.snapshotRestore.repositoryForm.errorUnknownRepositoryTypesMessage',
            {
              defaultMessage: `The repository type '{type}' is not supported.`,
              values: {
                type: repositoryType,
              },
            }
          ),
        }}
      />
    );
  };

  return type === REPOSITORY_TYPES.source
    ? renderTypeSettings(settings.delegateType)
    : renderTypeSettings(type);
};
