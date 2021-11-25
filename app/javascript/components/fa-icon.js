import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faKey } from '@fortawesome/fontawesome-free-solid'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(faUser, faKey, faGithub)

const FaIcon = ({
  icon,
  iconProps,
  size,
  ...props
}) => <FontAwesomeIcon icon={icon} size={size} {...iconProps} />

export default FaIcon
