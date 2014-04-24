class AccessorsController < ApplicationController
  before_action :set_accessor, only: [:show, :edit, :update, :destroy]

  respond_to :json

  # GET /accessors
  # GET /accessors.json
  def index
    @accessors = Accessor.all
  end
  
  
  # GET /accessors
  # GET /accessors.json
  def myfunc
    @accessor = Accessor.find(params[:id])
  end
  
  # GET /accessors
  # GET /accessors.json
  def belongs_to_garage
    @accessors = Accessor.where("garage_id=:gid", {gid: params[:id]})
  end
  
  
  
  # GET /accessors
  # GET /accessors.json
  def friends_can_access_garage  
    @accessors = Accessor.joins("INNER JOIN friends on accessors.friend_id = friends.id").where("garage_id=:gid", {gid: params[:id]}).select("accessors.*, accessors.id as accessor_id, friends.*")
  end
  
  # GET /accessors
  # GET /accessors.json
  def friends_cannot_access_garage  
    @friends = Friend.all.select("friends.*, friends.id as friend_id") - Friend.joins("join accessors on friends.id=accessors.friend_id").where("accessors.garage_id=:gid", {gid:params[:id]}).select("friends.*, friends.id as friend_id")
  end
  
  # GET /accessors
  # GET /accessors.json
  def belongs_to_garage
    @accessors = Accessor.where("garage_id=:gid", {gid: params[:id]})
  end
  
  # GET /accessors/1
  # GET /accessors/1.json
  def show
  end

  # GET /accessors/new
  def new
    @accessor = Accessor.new
  end

  # GET /accessors/1/edit
  def edit
  end

  # POST /accessors
  # POST /accessors.json
  def create
    @accessor = Accessor.new(accessor_params)

    respond_to do |format|
      if @accessor.save
        format.html { redirect_to @accessor, notice: 'Accessor was successfully created.' }
        format.json { render action: 'show', status: :created, location: @accessor }
      else
        format.html { render action: 'new' }
        format.json { render json: @accessor.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /accessors/1
  # PATCH/PUT /accessors/1.json
  def update
    respond_to do |format|
      if @accessor.update(accessor_params)
        format.html { redirect_to @accessor, notice: 'Accessor was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @accessor.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /accessors/1
  # DELETE /accessors/1.json
  def destroy
    @accessor.destroy
    respond_to do |format|
      format.html { redirect_to accessors_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_accessor
      @accessor = Accessor.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def accessor_params
      params.require(:accessor).permit(:garage_id, :friend_id, :code)
    end
end
