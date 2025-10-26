
# Souq Al Sharqia - Classified Ads Platform

A modern, full-featured classified ads platform built with Laravel, Inertia.js, and React. This platform allows users to post, browse, and manage classified advertisements across different categories and locations.

## 🚀 Features

### User Features
- **User Authentication**: Registration, login, and profile management with JWT authentication
- **Ad Management**: Create, edit, delete, and manage classified ads
- **Category System**: Browse ads by categories and subcategories
- **Location-based Filtering**: Filter ads by geographic places/regions
- **Search Functionality**: Advanced search for ads with various filters
- **Image Upload**: Multiple image uploads with Cloudinary integration
- **Ad Status Tracking**: Track ad approval status (accepted/rejected)
- **Featured Ads**: Promote ads with featured status

### Admin Features
- **Content Moderation**: Approve or reject submitted ads
- **Category Management**: Manage categories and subcategories
- **User Management**: Manage user accounts and permissions
- **Settings Management**: Configure platform settings

### Technical Features
- **Responsive Design**: Built with Tailwind CSS and DaisyUI
- **Modern Frontend**: React with TypeScript and Inertia.js
- **RESTful API**: Clean API endpoints for mobile/external integrations
- **File Management**: Cloudinary integration for image storage and optimization
- **PDF Generation**: Generate reports and documents with DomPDF
- **QR Code Generation**: Generate QR codes for ads
- **Testing Suite**: Comprehensive tests with Pest PHP

## 🛠 Tech Stack

### Backend
- **PHP 8.2+**
- **Laravel 12.x**
- **MySQL/PostgreSQL**
- **JWT Authentication**
- **Laravel Sanctum**

### Frontend
- **React 18**
- **TypeScript**
- **Inertia.js**
- **Tailwind CSS**
- **DaisyUI**
- **Radix UI Components**

### Tools & Services
- **Vite** - Build tool and dev server
- **Cloudinary** - Image storage and optimization
- **Pest** - Testing framework
- **Laravel Pint** - Code formatting
- **ESLint & Prettier** - Code linting and formatting

## 📋 Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm/yarn
- MySQL or PostgreSQL
- Cloudinary account (for image uploads)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/devmohamedesmail/Souq-Al-Sharqia-Classified-Ads-Platform.git
   cd Souq-Al-Sharqia-Classified-Ads-Platform
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment Setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure your `.env` file**
   ```env
   # Database
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=souq_al_sharqia
   DB_USERNAME=your_username
   DB_PASSWORD=your_password

   # Cloudinary Configuration
   CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # JWT Configuration
   JWT_SECRET=your_jwt_secret
   ```

6. **Database Setup**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

7. **Build Frontend Assets**
   ```bash
   npm run build
   # Or for development
   npm run dev
   ```

8. **Start the development server**
   ```bash
   php artisan serve
   ```

## 📱 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/user` - Get user profile
- `PUT /api/user` - Update user profile
- `POST /api/logout` - User logout

### Categories & Places
- `GET /api/categories` - Get all categories
- `GET /api/subcategories/{category_id}` - Get subcategories
- `GET /api/places` - Get all places
- `GET /api/places/categories/{place_id}` - Get categories for a place

### Ads Management
- `POST /api/post/ad` - Create new ad
- `GET /api/ad/details/{id}` - Get ad details
- `POST /api/ad/update/{id}` - Update ad
- `DELETE /api/ad/delete/{id}` - Delete ad
- `POST /api/ad/search` - Search ads
- `GET /api/user/ads/{id}` - Get user's ads
- `GET /api/show/user/accepted/ads/{id}` - Get user's accepted ads
- `GET /api/show/user/rejected/ads/{id}` - Get user's rejected ads

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
php artisan test

# Run specific test suite
./vendor/bin/pest tests/Feature
./vendor/bin/pest tests/Unit

# Run tests with coverage
./vendor/bin/pest --coverage
```

## 🎨 Frontend Development

### Development Mode
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Code Formatting
```bash
npm run format      # Format code
npm run format:check # Check formatting
npm run lint        # Run ESLint
```

### Type Checking
```bash
npm run types
```

## 🗂 Project Structure

```
app/
├── Http/Controllers/    # API and web controllers
├── Models/             # Eloquent models
├── Policies/           # Authorization policies
└── Providers/          # Service providers

resources/
├── js/                 # React components and pages
├── css/               # Stylesheets
└── views/             # Blade templates

database/
├── migrations/        # Database migrations
├── factories/         # Model factories
└── seeders/          # Database seeders

routes/
├── api.php           # API routes
├── web.php           # Web routes
├── auth.php          # Authentication routes
└── settings.php      # Settings routes
```

## 🔧 Configuration

### Cloudinary Setup
1. Create a Cloudinary account
2. Get your cloud name, API key, and API secret
3. Add them to your `.env` file
4. Configure upload presets if needed

### JWT Authentication
1. Generate JWT secret: `php artisan jwt:secret`
2. Configure JWT settings in `config/jwt.php`

## 🚀 Deployment

### Production Build
```bash
composer install --optimize-autoloader --no-dev
npm run build
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Environment Configuration
- Set `APP_ENV=production`
- Set `APP_DEBUG=false`
- Configure your production database
- Set up proper file permissions
- Configure web server (Apache/Nginx)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow PSR-12 coding standards for PHP
- Use TypeScript for all React components
- Write tests for new features
- Run tests and linting before submitting PRs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Mohamed Esmail** - *Initial work* - [@devmohamedesmail](https://github.com/devmohamedesmail)

## 🙏 Acknowledgments

- Laravel community for the amazing framework
- React and Inertia.js teams for the modern frontend stack
- Cloudinary for image management services
- All contributors who helped improve this project

## 📞 Support

If you have any questions or need help with setup, please:
1. Check the [Issues](https://github.com/devmohamedesmail/Souq-Al-Sharqia-Classified-Ads-Platform/issues) page
2. Create a new issue if your problem isn't already addressed
3. Provide detailed information about your environment and the issue

---

**Happy coding! 🎉**