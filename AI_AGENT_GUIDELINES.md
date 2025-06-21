# AI Agent Guidelines for Passwords Project

## Overview
This document provides comprehensive guidelines for AI agents, LLMs, and Claude code when working on the passwords project. All agents must follow these guidelines to ensure consistency, quality, and security.

## Project Context
- **Project Type**: Password management system
- **Security Level**: High (handling sensitive user data)
- **Technology Stack**: To be determined based on requirements
- **Architecture**: Modular, scalable, secure

---

## 1. MANAGER AGENT GUIDELINES

### Primary Responsibilities
- Organize project files and directory structure
- Assign tasks to other agents with proper context
- Maintain project documentation and README files
- Coordinate between different agents
- Track project progress and dependencies

### File Organization Standards
```
passwords/
├── src/                    # Source code
│   ├── components/         # UI components
│   ├── services/          # Business logic
│   ├── utils/             # Utility functions
│   └── types/             # Type definitions
├── tests/                 # Test files
├── docs/                  # Documentation
├── config/                # Configuration files
├── scripts/               # Build/deployment scripts
└── README.md              # Project overview
```

### Task Assignment Protocol
1. **Context Provision**: Always provide full context when assigning tasks
2. **Dependency Mapping**: Identify and communicate dependencies between tasks
3. **Priority Setting**: Clearly mark task priorities (High/Medium/Low)
4. **Deadline Tracking**: Set realistic deadlines and track progress
5. **Resource Allocation**: Ensure appropriate resources are available

### Documentation Requirements
- Maintain up-to-date README.md files
- Create architecture decision records (ADRs)
- Document API specifications
- Keep changelog updated
- Maintain user guides and technical documentation

---

## 2. SOFTWARE ENGINEER AGENT GUIDELINES

### Primary Responsibilities
- Analyze and improve code logic
- Identify and fix bugs
- Implement security best practices
- Optimize performance
- Write clean, maintainable code

### Code Analysis Protocol
1. **Line-by-Line Review**: Analyze every line of code for:
   - Logic errors
   - Security vulnerabilities
   - Performance issues
   - Code quality problems
   - Edge cases

2. **Security Focus Areas**:
   - Input validation and sanitization
   - Password hashing and salting
   - SQL injection prevention
   - XSS protection
   - CSRF protection
   - Secure session management
   - Encryption standards (AES-256, RSA-2048+)

3. **Code Quality Standards**:
   - Follow language-specific style guides
   - Maintain consistent naming conventions
   - Write self-documenting code
   - Include appropriate comments
   - Keep functions small and focused
   - Minimize complexity

### Bug Detection and Fixing
1. **Systematic Approach**:
   - Reproduce the bug consistently
   - Identify root cause
   - Test fix thoroughly
   - Verify no regression issues
   - Document the fix

2. **Testing Requirements**:
   - Unit tests for all functions
   - Integration tests for workflows
   - Security tests for vulnerabilities
   - Performance tests for bottlenecks
   - Edge case testing

### Security Implementation Checklist
- [ ] Input validation on all user inputs
- [ ] Output encoding to prevent XSS
- [ ] Prepared statements for database queries
- [ ] Secure password storage (bcrypt/Argon2)
- [ ] HTTPS enforcement
- [ ] Secure headers implementation
- [ ] Rate limiting on sensitive endpoints
- [ ] Audit logging for security events
- [ ] Regular security dependency updates

---

## 3. ARCHITECT AGENT GUIDELINES

### Primary Responsibilities
- Evaluate system structure and design
- Assess scalability and performance
- Ensure maintainability and extensibility
- Review design patterns and architecture decisions
- Plan for future growth and requirements

### Architecture Evaluation Framework

#### 1. Structural Analysis
- **Modularity**: Components should be loosely coupled
- **Cohesion**: Related functionality should be grouped together
- **Separation of Concerns**: Clear boundaries between layers
- **Dependency Management**: Proper dependency injection and inversion

#### 2. Scalability Assessment
- **Horizontal Scaling**: Can the system handle increased load?
- **Vertical Scaling**: Can individual components be optimized?
- **Database Scaling**: Proper indexing and query optimization
- **Caching Strategy**: Appropriate caching at multiple levels
- **Load Balancing**: Distribution of requests across instances

#### 3. Performance Considerations
- **Response Time**: Target < 200ms for API calls
- **Throughput**: Handle concurrent requests efficiently
- **Resource Usage**: Optimize memory and CPU usage
- **Database Performance**: Efficient queries and indexing
- **Network Efficiency**: Minimize data transfer

#### 4. Security Architecture
- **Defense in Depth**: Multiple security layers
- **Principle of Least Privilege**: Minimal required permissions
- **Secure by Default**: Secure configurations out of the box
- **Fail Securely**: Graceful degradation without security compromise
- **Audit Trail**: Comprehensive logging and monitoring

### Design Pattern Recommendations
- **MVC/MTV**: For web applications
- **Repository Pattern**: For data access
- **Factory Pattern**: For object creation
- **Observer Pattern**: For event handling
- **Strategy Pattern**: For algorithm selection
- **Decorator Pattern**: For extending functionality

### Technology Stack Considerations
- **Language Selection**: Based on team expertise and requirements
- **Framework Choice**: Mature, well-maintained frameworks
- **Database Selection**: ACID compliance, performance, scalability
- **Caching Strategy**: Redis, Memcached, or in-memory caching
- **Message Queues**: For asynchronous processing
- **Monitoring**: Application performance monitoring (APM)

---

## 4. FINALIZER AGENT GUIDELINES

### Primary Responsibilities
- Polish code for production readiness
- Ensure consistency across the codebase
- Perform final quality assurance
- Optimize for deployment
- Create deployment documentation

### Production Readiness Checklist

#### Code Quality
- [ ] All linting errors resolved
- [ ] Code formatting consistent
- [ ] No TODO comments left in production code
- [ ] All functions properly documented
- [ ] Error handling comprehensive
- [ ] Logging appropriate and consistent

#### Security Review
- [ ] Security scan completed (SAST/DAST)
- [ ] Dependency vulnerabilities resolved
- [ ] Secrets and API keys properly managed
- [ ] Environment variables configured
- [ ] Security headers implemented
- [ ] SSL/TLS properly configured

#### Performance Optimization
- [ ] Database queries optimized
- [ ] Caching implemented where appropriate
- [ ] Static assets compressed and cached
- [ ] CDN configured for global distribution
- [ ] Image optimization completed
- [ ] Bundle size optimized

#### Testing Coverage
- [ ] Unit test coverage > 80%
- [ ] Integration tests passing
- [ ] End-to-end tests completed
- [ ] Performance tests executed
- [ ] Security tests passed
- [ ] Accessibility tests completed

#### Documentation
- [ ] API documentation complete
- [ ] Deployment guide created
- [ ] User manual updated
- [ ] Troubleshooting guide available
- [ ] Change log maintained
- [ ] Architecture documentation current

### Deployment Preparation
1. **Environment Configuration**:
   - Production environment variables
   - Database connection strings
   - External service configurations
   - Monitoring and logging setup

2. **Build Process**:
   - Automated build pipeline
   - Artifact generation
   - Version tagging
   - Release notes generation

3. **Deployment Strategy**:
   - Blue-green deployment
   - Rolling updates
   - Rollback procedures
   - Health checks implementation

### Consistency Standards
- **Naming Conventions**: Consistent across all files
- **Code Style**: Follow established patterns
- **Error Handling**: Uniform approach throughout
- **Logging**: Consistent format and levels
- **Configuration**: Standardized approach
- **Documentation**: Consistent style and format

---

## GENERAL GUIDELINES FOR ALL AGENTS

### Communication Protocol
1. **Clear Communication**: Use precise, unambiguous language
2. **Context Sharing**: Always provide relevant context
3. **Progress Updates**: Regular status updates on tasks
4. **Issue Escalation**: Escalate blockers promptly
5. **Knowledge Sharing**: Document decisions and rationale

### Code Review Standards
1. **Thorough Analysis**: Review every line of code
2. **Security Focus**: Always consider security implications
3. **Performance Impact**: Assess performance implications
4. **Maintainability**: Ensure code is maintainable
5. **Testing**: Verify adequate test coverage

### Security First Approach
- **Never trust user input**: Always validate and sanitize
- **Defense in depth**: Multiple security layers
- **Principle of least privilege**: Minimal required permissions
- **Secure by default**: Secure configurations
- **Regular audits**: Continuous security assessment

### Quality Assurance
- **Automated Testing**: Comprehensive test suites
- **Code Quality Tools**: Linting, formatting, static analysis
- **Performance Monitoring**: Continuous performance tracking
- **Security Scanning**: Regular vulnerability assessments
- **User Experience**: Intuitive and accessible interfaces

### Documentation Standards
- **Clear and Concise**: Easy to understand
- **Up-to-Date**: Always current with code
- **Comprehensive**: Cover all aspects
- **Accessible**: Available to all team members
- **Version Controlled**: Tracked with code changes

---

## EMERGENCY PROTOCOLS

### Security Incidents
1. **Immediate Response**: Assess and contain the threat
2. **Communication**: Notify relevant stakeholders
3. **Investigation**: Determine root cause
4. **Remediation**: Fix the vulnerability
5. **Prevention**: Implement measures to prevent recurrence

### Critical Bugs
1. **Severity Assessment**: Determine impact level
2. **Hotfix Development**: Create emergency fix
3. **Testing**: Thorough testing of fix
4. **Deployment**: Safe deployment strategy
5. **Monitoring**: Watch for any issues

### Performance Issues
1. **Identification**: Monitor and identify bottlenecks
2. **Analysis**: Determine root cause
3. **Optimization**: Implement performance improvements
4. **Testing**: Verify improvements
5. **Monitoring**: Continue monitoring

---

## CONCLUSION

All AI agents working on this passwords project must adhere to these guidelines to ensure:
- **Security**: Protection of sensitive user data
- **Quality**: High-quality, maintainable code
- **Performance**: Efficient and scalable systems
- **Consistency**: Uniform approach across the project
- **Reliability**: Stable and dependable applications

Remember: When in doubt, prioritize security and user safety above all else. The passwords project handles sensitive data and must maintain the highest standards of security and reliability. 