
-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Users table policies
-- Allow users to read any profile
CREATE POLICY "Users can view all profiles" ON users
    FOR SELECT USING (true);

-- Allow users to update only their own profile
CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Projects table policies
-- Allow anyone to read projects
CREATE POLICY "Anyone can view projects" ON projects
    FOR SELECT USING (true);

-- Allow authenticated users to create projects
CREATE POLICY "Authenticated users can create projects" ON projects
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to update only their own projects
CREATE POLICY "Users can update their own projects" ON projects
    FOR UPDATE USING (auth.uid() = user_id);

-- Allow users to delete only their own projects
CREATE POLICY "Users can delete their own projects" ON projects
    FOR DELETE USING (auth.uid() = user_id);

-- Posts table policies
-- Allow anyone to read posts
CREATE POLICY "Anyone can view posts" ON posts
    FOR SELECT USING (true);

-- Allow authenticated users to create posts
CREATE POLICY "Authenticated users can create posts" ON posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to update only their own posts
CREATE POLICY "Users can update their own posts" ON posts
    FOR UPDATE USING (auth.uid() = user_id);

-- Allow users to delete only their own posts
CREATE POLICY "Users can delete their own posts" ON posts
    FOR DELETE USING (auth.uid() = user_id);

-- Stories table policies
-- Allow anyone to read stories
CREATE POLICY "Anyone can view stories" ON stories
    FOR SELECT USING (true);

-- Allow authenticated users to create stories
CREATE POLICY "Authenticated users can create stories" ON stories
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to update only their own stories
CREATE POLICY "Users can update their own stories" ON stories
    FOR UPDATE USING (auth.uid() = user_id);

-- Allow users to delete only their own stories
CREATE POLICY "Users can delete their own stories" ON stories
    FOR DELETE USING (auth.uid() = user_id);

-- Bookmarks table policies
-- Allow users to read only their own bookmarks
CREATE POLICY "Users can view their own bookmarks" ON bookmarks
    FOR SELECT USING (auth.uid() = user_id);

-- Allow authenticated users to create bookmarks
CREATE POLICY "Authenticated users can create bookmarks" ON bookmarks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to delete only their own bookmarks
CREATE POLICY "Users can delete their own bookmarks" ON bookmarks
    FOR DELETE USING (auth.uid() = user_id);
